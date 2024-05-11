export const functionTemplate = `
/**
* you can use remote scripts by adding a comment at the top of the file
* like this: //@remote:https://example.com/your-script.js
*/


/**
* Transport maybe local or remote
*/

function onTransportReady() {

    return function () {
        /**
        * @callback Read
        * @param {number} size
        * @param {number} [timeout]
        * @returns {Uint8Array}
        * @callback Write
        * @param {Uint8Array} data
        */
        
        /**
        * @param {Read} cb
        */
        this.read = function (cb) {
            //return read bytes 
        }
       
   
        
        /**
        * @param {Write} cb
        * @param {Uint8Array | string} data
        * @param {boolean} [isForward] - If true, the data is forwarded to the remote server
        */
        this.write = function (cb, data, isForward) {
            //write bytes
            
            if(data instanceof Uint8Array) {
                cb(data)
            }
        }
        
        /**
        * @param {Uint8Array} data - How to display the data 
        * @returns {string}
        */
        this.display = function (data) {
        
        }
    }
}
`;
