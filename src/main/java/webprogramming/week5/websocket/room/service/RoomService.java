package webprogramming.week5.websocket.room.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import jakarta.websocket.Session;
import webprogramming.week5.websocket.room.entity.Room;
import webprogramming.week5.websocket.room.repository.RoomRepository;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {
    private final RoomRepository roomRepository;
    private final Map<Long, Session> clientSessions = new ConcurrentHashMap<>();
    private final Map<Long, Session> counselorSessions = new ConcurrentHashMap<>();

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room getRoomByNumber(int roomNumber) {
        log.info("roomRepository.findAll() : {}",roomRepository.findAll().size());

        log.info("rooNUmber -1 {} ,",roomNumber -1 );
        log.info("rooNUmber {} ,",roomNumber -1 );

        Room room=roomRepository.findAll().get(roomNumber-1);
        log.info("room get id {}",room.getId());

        //return roomRepository.findAll().get(roomNumber);
        return room;
    }

    public void addClientSession(Long roomId, Session session) {
        clientSessions.put(roomId, session);
    }

    public void addCounselorSession(Long roomId, Session session) {
        counselorSessions.put(roomId, session);
    }

    public Session getClientSession(Long roomId) {
        return clientSessions.get(roomId);
    }

    public Session getCounselorSession(Long roomId) {
        return counselorSessions.get(roomId);
    }

    public void removeClientSession(Long roomId) {
        clientSessions.remove(roomId);
    }

    public void removeCounselorSession(Long roomId) {
        counselorSessions.remove(roomId);
    }


}
