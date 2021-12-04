const express = require('express');
const router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
router.post(`/`, async (req, res) => {
    let filter = {};
    console.log('req bdy ',req.body)
    if (req.body.id) {
       
            // A unique identifier for the given session
            const sessionId = uuid.v4();
            const projectId = 'roozgar-bot-p9cp'         
            // Create a new session
            const sessionClient = new dialogflow.SessionsClient({keyFilename:"roozgar-bot-p9cp-8e405c160004.json"});
            const sessionPath = sessionClient.projectAgentSessionPath(
              projectId,
              sessionId
            );
            var user2;
            if(req.body.intent == "Default Fallback Intent"){
                user2=`projects/${projectId}/agent/sessions/${sessionId}/contexts/Default Fallback Intent`

            }
            else{
                user2=req.body.intent;
            }
           
            
      
            // The text query request.
            const request = {
              session: sessionPath,
              queryParams:{
                //List of context to be sent and activated before the query is executed
                
                contexts:[{
                    name: user2,
                    // The lifespan of the context
                    lifespanCount: 2
                },
                ]
            },
              queryInput: {
                text: {
                  // The query to send to the dialogflow agent
                  text: req.body.id,
                  Intent:req.body.intent,
                  // The language used by the client (en-US)
                  languageCode: 'en-US',
                },
              },
            };
          
            // Send request and log result
            const responses = await sessionClient.detectIntent(request);
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log("result: " , result);
            console.log('output context is ',responses[0].queryResult.outputContexts[0])
            if (!responses[0].queryResult) {
                res.status(500).json({ success: false });
            }
            console.log("fullfillment text is ",result.fulfillmentText)
            res.status(200).send({fulfillmentText: result.fulfillmentText,responseId:responses[0].responseId,intent:responses[0].queryResult.outputContexts[0].name,lifespanCount:responses[0].queryResult.outputContexts[0].lifespanCount}); 
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);

            if (result.intent) {
              console.log(`  Intent: ${result.intent.displayName}`);
            } else {
              console.log('  No intent matched.');
            }
        
    }

   

  
});
module.exports =router;