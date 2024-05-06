package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Parcours;
import com.dfoad.GestionDesCoursHybrides.modele.Niveau;
import com.dfoad.GestionDesCoursHybrides.modele.Semestre;

@Repository
public interface SemestreRepository extends JpaRepository<Semestre , Long> {
   
  
}
