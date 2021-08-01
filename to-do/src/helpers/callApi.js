import axios from 'axios';

const emptyFun = (...para) => undefined;

const axiosWrapper = (
    apiParth,
    methodType = 'get',
    requestBody = {},
    cb 
) => {
    let apiCallObject = {
        method: methodType,
        url: apiParth,
        data: requestBody,
    };

    axios(apiCallObject)
        .then((response) => {
            cb(null, {
                _statue: true,
                data: response.data,
            });
        })
        .catch((error) => {
            cb(
                {
                  _statue: false,
                  data: error,
                },
                null
            );
        });
};


const callApi = (apiUrl = null) => {
    var attributes = {
        apiUrl: apiUrl,
        method: 'get',
        body: {},
    };
    return {

        method: function (method = 'post') {
            attributes = {
                ...attributes,
                method: method,
            };
            return this;
        },
        /**
         * @description: set api body
         * @param {Object|Array} status set api body
         */

        body: function (body = {}) {
            attributes = {
                ...attributes,
                body: body,
            };
            return this;
        },


        /**
         * @description: send request to end-point
         * @param {Function} cb callback function
         */
        send: function (cb) {
            return axiosWrapper(
                attributes.apiUrl,
                attributes.method,
                attributes.body,
                cb
            );
        },
    };
};

export { callApi, axiosWrapper };
