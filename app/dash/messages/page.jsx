import {getMessages} from "../../controllers/Message";
import Messages from "../components/Messages";

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