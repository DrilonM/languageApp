import React, { useState } from "react";
import { Container, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import {CohereClient} from "cohere-ai/Client";

const cohere = new CohereClient({
    token: "LXqw86Y15fLxyGJVtc5Y4Q5mJHuIA4gLGW2aAU8V",
});

function ChatInterface() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const prompt = "(You are French waiter talking to a tourist, reply in french unless asked in English. Keep answers short). Your previous response was: " + response;

        const userMessage = input;
        setInput("");
        setLoading(true);

        try {
            const response = await cohere.chat({
                model: "command-a-03-2025",
                message: prompt + userMessage,
            });

            const botReply = response.text || "No response";

            setMessages((prev) => [...prev, { user: userMessage, bot: botReply }]);
            setResponse(botReply);
        } catch (error) {
            console.error("Cohere error:", error);
            setMessages((prev) => [...prev, { user: userMessage, bot: "Error getting response." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h3>Chatbot</h3>
            <ListGroup className="mb-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {messages.map((msg, idx) => (
                    <ListGroup.Item key={idx}>
                        <strong>You:</strong> {msg.user}
                        <br />
                        <strong>Bot:</strong> {msg.bot}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Form.Control
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="mb-2"
                disabled={loading}
            />
            <Button onClick={handleSend} variant="primary" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : "Send"}
            </Button>
        </Container>
    );
}

export default ChatInterface;
