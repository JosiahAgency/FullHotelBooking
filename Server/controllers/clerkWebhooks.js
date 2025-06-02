import User from "../models/User.js";
import {Webhook} from "svix";

const clerkWebhooks = async (request, response) => {
    try {
        const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            'svix-id': request.headers['svix-id'],
            'svix-timestamp': request.headers['svix-timestamp'],
            'svix-signature': request.headers['svix-signature'],
        }

        await wHook.verify(JSON.stringify(request.body), headers);

        const {data, type} = request.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            name: data.first_name + ' ' + data.last_name,
            image: data.image_url,
        }

        switch (type) {
            case 'user.created':
                try {
                    await User.create(userData);
                    console.log('User created');
                } catch (err) {
                    console.error('Mongoose create error:', err.message);
                }
                break;
            case 'user.updated':
                try {
                    await User.findByIdAndUpdate(data.id, userData);
                } catch (err) {
                    console.error('Mongoose update error:', err.message);
                }
                break;
            case 'user.deleted':
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }

        response.json({success: true, message: 'Webhook received successfully.'});
    } catch (e) {
        console.error('Webhook error:', e);
        response.status(500).json({success: false, message: 'Internal Server Error'});
    }
}

export default clerkWebhooks;
