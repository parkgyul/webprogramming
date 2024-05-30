package webprogramming.week5.websocket.room.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webprogramming.week5.websocket.client.entity.Client;
import webprogramming.week5.websocket.messages.entity.Messages;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;


    @OneToOne
    private Client client;

    @OneToMany(mappedBy = "room")
    private List<Messages> messages = new ArrayList<>();

    @Builder
    public Room(Client client){
        this.client = client;
    }

}
