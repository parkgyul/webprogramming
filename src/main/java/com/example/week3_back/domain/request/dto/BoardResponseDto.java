package com.example.week3_back.domain.request.dto;

import lombok.Builder;

@Builder
public record BoardResponseDto(String writer, String title, String body, String writingTime) { }