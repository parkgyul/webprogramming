package webprogramming.week5.websocket.messages.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webprogramming.week5.websocket.room.entity.Room;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @Column(name = "sender")
    private String sender;

    @Column(name = "message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Builder
    public Messages(String sender, String message, Room room){
        this.sender = sender;
        this.message = message;
        this.room = room;
    }

}
