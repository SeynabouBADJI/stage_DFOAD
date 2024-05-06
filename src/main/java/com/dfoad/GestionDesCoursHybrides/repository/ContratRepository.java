package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Contrat;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, Long> {
    @Query(value = "SELECT * FROM contrat c WHERE c.responsable_dfoad_id = ?1", nativeQuery = true)
    List<Contrat> findByResponsableDfoad(Long responsableDfoadId);

    @Query(value = "SELECT * FROM contrat c WHERE c.enseignant_id = ?1", nativeQuery = true)
    List<Contrat> findByEnseignant(Long enseignantId);

}
