package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.AnneeScolaire;
import com.dfoad.GestionDesCoursHybrides.modele.Formation;

@Repository
public interface AnneeScolaireRepository extends JpaRepository<AnneeScolaire, Long> {
  
}