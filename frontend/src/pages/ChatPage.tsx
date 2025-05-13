import React from "react";
import ChatInterface from "../components/ChatInterface";

function ChatPage() {
    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <div className="row m-5">
                    <h1 className="text-primary fw-bold">
                        ChatPage
                    </h1>
                </div>

                <div className="row m-5">
                    <ChatInterface></ChatInterface>
                </div>
            </div>
            </>
    );
}

export default ChatPage;