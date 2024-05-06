package com.dfoad.GestionDesCoursHybrides.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Titulaire;
@Repository
public interface TitulaireRepository extends JpaRepository<Titulaire , Long>{
    
}
