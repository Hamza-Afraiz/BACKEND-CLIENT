const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
    
    }).unless({
        path: [
           
            `${api}/client/login`,
            `${api}/client/register`,
            `${api}/client/sendOTP`,
            `${api}/client/checkPhoneNumber`,
            `${api}/client/changePassword/`,
            `${api}/client/getReceipt/`,
            `${api}/client/getReceiptByAppoitmentId/`,
            `${api}/client/changePassword2/`,
            `${api}/category/`,
            `${api}/service/`,
            `${api}/vendor/`,
            `${api}/orders/`,
            `${api}/review/`,
            `${api}/ongoingOrder/`,
            `${api}/ongoingOrder/delete/`,
            `${api}/ongoingOrder/delete1/`,
            `${api}/ongoingOrder/appoitmentId/`,
            `${api}/acceptedOrder/`,
            `${api}/acceptedOrder/appoitmentId/`,
            `${api}/cancelledOrder/cancelOrder/`,
            `${api}/cancelledOrder/`,
            `${api}/service/vendorId`,
            `${api}/service/subCategory`,
            `${api}/upcomingOrder/`,
            `${api}/upcomingOrder/clientId/`,
            `${api}/SubCategory/`,
            `${api}/complaint/`,
            `${api}/complaint/notAnswered/`,
            `${api}/receipt/`,
            `${api}/chatbot/`,

            
        ]
    })
}

/*async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}
*/


module.exports = authJwt;