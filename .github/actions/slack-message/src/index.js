const core = require('@actions/core');
const github = require('@actions/github');
const { WebClient } = require('@slack/web-api');
const flatten = require('flat');
const axios = require('axios');

try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    let payload = core.getInput('payload');

    if (webhookUrl === undefined) {
        throw 'Need to provide at least one webhookUrl'
    }

    if (typeof webhookUrl !== 'undefined' && webhookUrl.length > 0) {

        if (payload.length < 1) {
            // No Payload was passed in
            console.log('no custom payload was passed in, using default payload that triggered the GitHub Action')
            // Get the JSON webhook payload for the event that triggered the workflow
            payload = github.context.payload;
        } 
        else {
            try {
                // confirm it is valid json
                payload = JSON.parse(payload);
            } catch (e) {
                // passed in payload wasn't valid json
                console.error("passed in payload was invalid JSON")
                throw 'Need to provide valid JSON payload'
            }
        }

        // flatten JSON payload (no nested attributes)
        const flatPayload = flatten(payload);

        // workflow builder requires values to be strings
        // iterate over every value and convert it to string
        Object.keys(flatPayload).forEach((key) => {
            flatPayload[key] = '' + flatPayload[key];
        })

        axios.post(webhookUrl, flatPayload).then(response => {
            // Successful post!
        }).catch(err => {
            console.log("axios post failed, double check the payload being sent includes the keys Slack expects")
            console.log(payload)
            console.log(err)
            throw err
        })
    }

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

} catch (error) {
    core.setFailed(error.message);
}
