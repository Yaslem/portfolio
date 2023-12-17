import Articles from "@/app/dash/components/Articles";
import {getMessages} from "@/app/controllers/Message";
import Messages from "@/app/dash/components/Messages";

export const metadata = {
    title: 'الرسائل',
}
const page = async () => {

    const { messages, status, message } = await getMessages()
    return (
       <Messages messages={messages} status={status} messageEmpty={message} />
    )
}

export default page