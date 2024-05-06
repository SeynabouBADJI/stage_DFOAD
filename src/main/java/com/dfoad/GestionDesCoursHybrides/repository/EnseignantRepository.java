package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Contrat;
import com.dfoad.GestionDesCoursHybrides.modele.Enseignant;

@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
  
    @Query(nativeQuery = true, value = "select * FROM enseignant c WHERE c.cours_id = ?1")
    List<Enseignant> findByCours(Long idcours);
}
