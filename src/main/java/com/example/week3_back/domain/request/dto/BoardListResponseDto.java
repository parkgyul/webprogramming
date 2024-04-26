package com.example.week3_back.domain.request.dto;

import lombok.Builder;

@Builder
public record BoardListResponseDto(Long id, String writer, String title, String writingTime){}