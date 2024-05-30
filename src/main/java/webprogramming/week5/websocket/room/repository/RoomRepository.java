package webprogramming.week5.websocket.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webprogramming.week5.websocket.room.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
