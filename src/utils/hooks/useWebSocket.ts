import { useState, useEffect, useRef } from "react";

interface WebSocketMessage {
    type: string;
    payload: any;
}

interface UseWebsocketReturn {
    sendMessage: (message: WebSocketMessage) => void;
    isConnected: boolean;
}

const useWebSocket = (url: string): UseWebsocketReturn => {
    const [isConnected, setIsConnected] = useState(false);
    const webSocketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        webSocketRef.current = ws;

        ws.onopen = () => {
            setIsConnected(true);
            console.log("Websocket connected");
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Message from server: ", message);
            // Handle incoming messages here
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log("Websocket disconnected");

            // Optionall, try to reconnect after a short delay
            setTimeout(() => {
                webSocketRef.current = new WebSocket(url);
            }, 3000);
        };

        ws.onerror = (error) => {
            console.error("Websocket error: ", error);
        };

        return () => {
            ws.close();
        };
    }, [url]);

    const sendMessage = (message: WebSocketMessage) => {
        if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        }
    };

    return { sendMessage, isConnected };
};

export default useWebSocket;
