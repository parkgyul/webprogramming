package webprogramming.week5.websocket.client.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webprogramming.week5.websocket.client.dto.ClientAllReadResponse;
import webprogramming.week5.websocket.client.dto.ClientSaveRequest;
import webprogramming.week5.websocket.client.entity.Client;
import webprogramming.week5.websocket.client.repository.ClientRepository;
import webprogramming.week5.websocket.room.entity.Room;
import webprogramming.week5.websocket.room.repository.RoomRepository;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final RoomRepository roomRepository;


    public Long clientSave(ClientSaveRequest clientSaveRequest){
        Client client = Client.builder()
                .client_name(clientSaveRequest.name())
                .build();

        clientRepository.save(client);

        // 클라이언트 저장 후 방 생성
        Room room = Room.builder()
                .client(client)
                .current(new Date())
                .build();
        roomRepository.save(room);

        return client.getId();
    }

    public List<ClientAllReadResponse> getAllClient(){

        try {

            List<Client> ClientList = clientRepository.findAll();
            List<ClientAllReadResponse> responseList = new ArrayList<>();

            for(Client client: ClientList) {
                responseList.add(new ClientAllReadResponse(client.getId(), client.getClient_name()));
            }
            return responseList;
        }catch(Exception e){
        }
        return null;
    }


}
