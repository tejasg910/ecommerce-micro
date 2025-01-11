// utils/rabbitmq.js
import amqplib from "amqplib";
interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
  }
  
  interface OrderMessage {
    userEmail: string;
    totalPrice: number;
    address: string;
    fullName: string;
    items: OrderItem[];
  }
const connectToRabbitMQ = async () => {
    try {
        const connection = await amqplib.connect(process.env.NEXT_PUBLIC_RABBITMQ_URL!);
        const channel = await connection.createChannel();
        return { connection, channel };
    } catch (error) {
        console.error("RabbitMQ connection error:", error);
        throw new Error("Failed to connect to RabbitMQ");
    }
};

export const sendMessageToQueue = async (
    queue: string,
    message: OrderMessage
  ): Promise<void> => {
    const { connection, channel } = await connectToRabbitMQ();
    try {
      // Assert the queue
      await channel.assertQueue(queue, { durable: true });
  
      // Send the message
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true,
      });
  
      console.log(`Message sent to queue "${queue}":`, message);
    } catch (error) {
      console.error("Failed to send message to RabbitMQ:", error);
      throw error;
    } finally {
      setTimeout(() => {
        connection.close();
      }, 500); // Close connection after a short delay to ensure the message is sent
    }
  };