package webprogramming.week5.websocket.room.repository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import jakarta.websocket.Session;
import webprogramming.week5.websocket.room.dto.RoomListResponse;
import webprogramming.week5.websocket.room.entity.Room;
import webprogramming.week5.websocket.room.repository.RoomRepository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

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


    public List<RoomListResponse> getAllroom(){
        try{
            List<Room> roomList = roomRepository.findAll();
            List<RoomListResponse> responseList= new ArrayList<>();

            for(Room room : roomList){
                responseList.add(
                        new RoomListResponse(room.getId(), room.getClient().getClient_name())
                );
            }
            return responseList;
        }catch(Exception e){

        }
        return null;
    }


    public Long todayRoomNumber() {
        List<Room> chatRooms = roomRepository.findAll();

        Calendar cal1 = Calendar.getInstance();
        cal1.setTime(new Date());
        cal1.set(Calendar.HOUR_OF_DAY, 0);
        cal1.set(Calendar.MINUTE, 0);
        cal1.set(Calendar.SECOND, 0);
        cal1.set(Calendar.MILLISECOND, 0);

        Long todayRoom = 0L;

        for (Room chatRoom : chatRooms) {
            Calendar cal2 = Calendar.getInstance();
            cal2.setTime(chatRoom.getCurrent());
            cal2.set(Calendar.HOUR_OF_DAY, 0);
            cal2.set(Calendar.MINUTE, 0);
            cal2.set(Calendar.SECOND, 0);
            cal2.set(Calendar.MILLISECOND, 0);

            if (cal1.getTime().equals(cal2.getTime())) {
                todayRoom++;
            }
        }

        return todayRoom;
    }

    public Long totalRoomNumber(){
        return (Long) (long) roomRepository.findAll().size();
    }
    public Room getRoomByNumber(int roomNumber) {
        log.info("roomRepository.findAll() : {}",roomRepository.findAll().size());

        log.info("rooNUmber -1 {} ,",roomNumber -1 );
        log.info("rooNUmber {} ,",roomNumber -1 );

        Room room=roomRepository.findAll().get(roomNumber-1);
        log.info("room get id {}",room.getId());
        log.info("room get id2 {}",room.getClient().getClient_name());
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
