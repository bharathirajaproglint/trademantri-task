import Methods from './Methods';
import HttpResponse from '../../util/HttpResponse';
import ResponseHandler from '../../util/Response';
import { ControllerLog as Log } from '../../util/Log';
import Entity from '../../entity';
import * as XLSX from 'xlsx';
import timediff from 'timediff';


class MainHandler {
    async Create(req, res) {
        const methodName = Methods.CREATE;
        Log.MethodEnter(methodName);
        const { bstr, fileName, companyId } = req.body
        try {
            const recievedOn = new Date()
            const workbook = XLSX.read(bstr, { type: 'base64' });
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
            let template = await Entity.template.findOne({}).exec(err => undefined, res => res);
            console.log(template)
            Entity.source_config.findOne({ companyId }).exec(function (err, data) {
                if (err) {
                    return HttpResponse(res, ResponseHandler.failure(methodName))
                };
                if (data) {
                    let dataColums = template ? template.normalizedJson.fileDetails.data : data.normalizedJson.fileDetails.data;
                    let sourceDataColumns = data.normalizedJson.fileDetails.data;
                    XL_row_object = XL_row_object.map((xlrow) => {
                        let dataObj = {}
                        // Object.assign({}, xlrow)

                        dataColums.forEach((obj) => {
                            let sourceColumn = sourceDataColumns.find(c => c.columnName === obj.columnName);
                            if (sourceColumn) {
                                dataObj[obj.columnName] = xlrow[obj.sourceColumnName]
                            }
                        })
                        return dataObj
                    })
                }
                Entity.datastore.create({
                    fileDetails: {
                        metadata: {
                            name: fileName,
                            recievedOn,
                            processOn: new Date(),
                            timeElapsedForProcessing: timediff(recievedOn, new Date(), 'HmSs')
                        },
                        data: XL_row_object
                    },
                    companyId
                }, function (err, data) {
                    if (err) {
                        console.log(err)
                        return HttpResponse(res, ResponseHandler.failure(methodName))
                    };
                    console.log('Saved')
                    return HttpResponse(res, ResponseHandler.success(methodName, data))
                })
            })

        } catch (error) {
            console.log(error)
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }

    async findTemplate(req, res) {
        const methodName = Methods.FIND_TEMPLATE;
        Log.MethodEnter(methodName);
        try {
            Entity.template.findOne({}).exec(function (err, data) {
                if (err) {
                    return HttpResponse(res, ResponseHandler.failure(methodName))
                };
                return HttpResponse(res, ResponseHandler.success(methodName, data))
            })
        } catch (error) {
            console.log(error)
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }

    async updateTemplate(req, res) {
        const methodName = Methods.UPDATE_TEMPLATE;
        Log.MethodEnter(methodName);
        // console.log('Body', req.body)
        const { id, normalizedJson } = req.body
        try {
            if (id) {
                Entity.template.findOneAndUpdate({ _id: id }, { normalizedJson }, { upsert: true }, function (err, doc) {
                    if (err) {
                        return HttpResponse(res, ResponseHandler.failure(methodName))
                    };
                    console.log('findOneAndUpdate', doc)
                    return HttpResponse(res, ResponseHandler.success(methodName, doc))
                });
            } else {
                Entity.template.findOne({}).exec(function (err, data) {
                    if (err) {
                        return HttpResponse(res, ResponseHandler.failure(methodName))
                    };
                    if (data) {
                        Entity.template.findOneAndUpdate({ _id: data.id }, { normalizedJson }, { upsert: true }, function (err, doc) {
                            if (err) {
                                return HttpResponse(res, ResponseHandler.failure(methodName))
                            };
                            console.log('findOneAndUpdatedata', data)
                            return HttpResponse(res, ResponseHandler.success(methodName, doc))
                        });
                    } else {
                        Entity.template.create({ normalizedJson }, { upsert: true }, function (err, doc) {
                            if (err) {
                                return HttpResponse(res, ResponseHandler.failure(methodName))
                            };
                            console.log('create', doc)
                            return HttpResponse(res, ResponseHandler.success(methodName, doc))
                        });
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }

    async findCompany(req, res) {
        const methodName = Methods.FIND_COMPANY;
        Log.MethodEnter(methodName);
        try {
            Entity.company.find({}).exec(function (err, data) {
                if (err) {
                    return HttpResponse(res, ResponseHandler.failure(methodName))
                };
                return HttpResponse(res, ResponseHandler.success(methodName, data))
            })
        } catch (error) {
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }

    async findSourceConfig(req, res) {
        const methodName = Methods.FIND_SOURCE_CONFIG;
        Log.MethodEnter(methodName);
        const { companyId } = req.query
        try {
            console.log(companyId)
            Entity.source_config.find({ companyId }).exec(function (err, data) {
                if (err) {
                    return HttpResponse(res, ResponseHandler.failure(methodName))
                };
                return HttpResponse(res, ResponseHandler.success(methodName, data))
            })
        } catch (error) {
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }

    async updateSourceConfig(req, res) {
        const methodName = Methods.UPDATE_SOURCE_CONFIG;
        Log.MethodEnter(methodName);
        // console.log('Body', req.body)
        const { id, normalizedJson, companyId } = req.body
        try {
            if (id) {
                Entity.source_config.findOneAndUpdate({ _id: id }, { normalizedJson, companyId }, { upsert: true }, function (err, doc) {
                    if (err) {
                        return HttpResponse(res, ResponseHandler.failure(methodName))
                    };
                    console.log('findOneAndUpdate', doc)
                    return HttpResponse(res, ResponseHandler.success(methodName, doc))
                });
            } else {
                Entity.source_config.findOne({ companyId }).exec(function (err, data) {
                    if (err) {
                        return HttpResponse(res, ResponseHandler.failure(methodName))
                    };
                    if (data) {
                        Entity.source_config.findOneAndUpdate({ _id: data.id }, { normalizedJson, companyId }, { upsert: true }, function (err, doc) {
                            if (err) {
                                return HttpResponse(res, ResponseHandler.failure(methodName))
                            };
                            console.log('findOneAndUpdatedata', data)
                            return HttpResponse(res, ResponseHandler.success(methodName, doc))
                        });
                    } else {
                        Entity.source_config.create({ normalizedJson, companyId }, { upsert: true }, function (err, doc) {
                            if (err) {
                                return HttpResponse(res, ResponseHandler.failure(methodName))
                            };
                            console.log('create', doc)
                            return HttpResponse(res, ResponseHandler.success(methodName, doc))
                        });
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }

    async Find(req, res) {
        const methodName = Methods.CREATE_CHECKOUT_SESSION;
        Log.MethodEnter(methodName);
        console.log('Body', req.query)
        try {
            Entity.datastore.find(req.query).exec(function (err, data) {
                console.log(err)
                console.log('------------------------------------------------')
                // console.log(data)
                if (err) {
                    return HttpResponse(res, ResponseHandler.failure(methodName))
                };
                console.log('Saved')
                return HttpResponse(res, ResponseHandler.success(methodName, data))
            })
        } catch (error) {
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }
    async login(req, res) {
        const methodName = Methods.CREATE_CHECKOUT_SESSION;
        Log.MethodEnter(methodName);
        try {
        } catch (error) {
            return HttpResponse(res, ResponseHandler.failure(methodName));
        }
    }
}
export default new MainHandler();