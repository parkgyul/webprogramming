package webprogramming.week5.websocket.client.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import webprogramming.week5.websocket.client.entity.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}
