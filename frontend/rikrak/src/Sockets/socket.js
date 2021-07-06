import io from "socket.io-client";
const sockets = io("https://obscure-mesa-65928.herokuapp.com/");
export default sockets;
