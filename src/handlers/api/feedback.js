import sendGrid from "@sendgrid/mail";

export const userFeedback = async (req, res, next) => {
    let { body: { mail, topic, message } } = req;
    sendGrid.setApiKey(process.env.SEND_GRID);
    const response = {};
    try {
        await sendGrid.send({
            to: process.env.SUPPORT_EMAIL,
            from: {
                email: mail ? mail : "feedback@testmaster.com",
                name: "Feedback - TestMaster"
            },
            subject: topic,
            content: [{ type: "text/plain", value: message }]
        });
        response.done = true;
    } catch (err) {
        console.log(err);
        response.done = false;
    } finally {
        res.json(response);
    }
}