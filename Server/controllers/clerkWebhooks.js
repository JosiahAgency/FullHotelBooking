import User from "../models/User.js";
import {Webhook} from "svix";

const clerkWebhooks = async (request, response) => {
    try {
        const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        console.log('1. Welcome to clerkwebhooks file');

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

        console.log('2. to clerkwebhooks file');

        console.log(userData);

        switch (type) {
            case 'user.created':
                await User.create(userData);
                break;
            case 'user.updated':
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case 'user.deleted':
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }

        response.json({success: true, message: 'Webhook received successfully.'});
    } catch (e) {
        console.log(e.message)
        response.json({success: false, message: e.message});
    }
}

export default clerkWebhooks;
