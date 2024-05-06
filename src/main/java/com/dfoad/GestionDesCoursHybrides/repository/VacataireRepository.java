package com.dfoad.GestionDesCoursHybrides.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Vacataire;
@Repository
public interface VacataireRepository extends JpaRepository<Vacataire , Long>{
    
}

