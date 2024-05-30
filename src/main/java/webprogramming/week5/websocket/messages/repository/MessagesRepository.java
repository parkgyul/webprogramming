package webprogramming.week5.websocket.messages.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webprogramming.week5.websocket.messages.entity.Messages;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, Long> {
}
