package com.mcmanuel.MushinChoirProject.repository;

import com.mcmanuel.MushinChoirProject.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson,Integer> {
}
