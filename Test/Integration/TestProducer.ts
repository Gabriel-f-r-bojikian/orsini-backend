import {Kafka} from 'kafkajs';
import { v4 as uuidv4 } from 'uuid';

import { IMessage } from '../../src/types/IMessage';

// const config = require(process.argv[0]);
const config = require('../../config/config.json');
console.log(config);
console.log(config.redPanda.host + ":" + config.redPanda.port);
const kafka = new Kafka({
    clientId: 'integration-test-suite',
    brokers: [config.redPanda.host + ":" + config.redPanda.port]
  });

const producer = kafka.producer();

producer.connect().then(() => {
        sendMessages();
});

function sendMessages() {
    const interval = 1000/60;
    let instant = 0;
    const mensagem = criaMensagem(instant);
    setInterval(() => {
        console.log("Timestamp " + instant + " - Sending message - " + mensagem);
        producer.send({
            topic: 'test-topic',
            messages: [
                mensagem
            ]
        })
        instant += interval;
    }, interval)
};

function calculaTensao(
    instante: number /*millisegundos*/, 
    defasagem = 0 /*radianos*/,
    frequencia = 60 /*Hertz*/
) {
    const omega = 2*Math.PI*frequencia;
    return Math.cos(omega*(instante/1000) + defasagem);
}

function calculaCorrente(tensao: number, R = 100 /*Ohms*/) {
    return tensao/R;
}

function criaMensagem(instante: number /*millisegundos*/) {
    const message: IMessage = {
        id: '',
        timestamp: '',
        Va: 0,
        Vb: 0,
        Vc: 0,
        Vn: 0,
        Ia: 0,
        Ib: 0,
        Ic: 0,
        In: 0,
    };

    message.id = String(uuidv4().toString);
    message.timestamp = String(new Date(instante).toDateString);
    message.Va = calculaTensao(instante);
    message.Vb = calculaTensao(instante, -Math.PI*2/3);
    message.Vc = calculaTensao(instante, +Math.PI*2/3);
    message.Vn = message.Va + message.Vb + message.Vc;
    message.Ia = calculaCorrente(message.Va);
    message.Ib = calculaCorrente(message.Vb);
    message.Ic = calculaCorrente(message.Vc);
    message.In = message.Ia + message.Ib + message.Ic;

    const jsonifiedMessage = JSON.stringify(message);
    const KafkaMessage = { value: jsonifiedMessage};

    return KafkaMessage;
}