package com.example.week3_back.domain.entity;
import com.example.week3_back.domain.request.dto.BoardUpdateRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Board {

    @GeneratedValue
    @Id
    @Column(name = "writing_id")
    private Long id;

    @Column(name = "writer")
    private String writer;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "writing_time")
    private String writingTime;

    @Builder
    public Board(String writer, String title, String body, String writingTime) {
        this.writer = writer;
        this.title = title;
        this.body = body;
        this.writingTime = writingTime;
    }

    public void update(BoardUpdateRequestDto requestDto) {
        this.title = requestDto.title();
        this.writer = requestDto.writer();
        this.body = requestDto.body();
    }
}
