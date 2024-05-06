package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Ufr;
import com.dfoad.GestionDesCoursHybrides.modele.Departement;
import com.dfoad.GestionDesCoursHybrides.modele.Formation;

@Repository
public interface UfrRepository extends JpaRepository<Ufr, Long> {
}
