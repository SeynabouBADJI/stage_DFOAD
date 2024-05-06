package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Niveau;
import com.dfoad.GestionDesCoursHybrides.modele.Semestre;

@Repository
public interface NiveauRepository extends JpaRepository<Niveau, Long> {
    @Query(nativeQuery = true, value = "select * FROM niveau where semestre_id =:idsemestre ; ")
    List<Niveau> findBySemestreNiveau(@Param("idsemestre") Long idsemestre);

    @Query(value = "SELECT * FROM niveau c WHERE c.formation_id = ?1", nativeQuery = true)
    List<Niveau> findByFormation(Long formationId);

}
