package com.example.week3_back.domain.repository;


import com.example.week3_back.domain.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> { }