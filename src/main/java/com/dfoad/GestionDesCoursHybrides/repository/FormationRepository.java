package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Formation;
@Repository
public interface FormationRepository extends JpaRepository<Formation, Long> {
   
    /* @Query(nativeQuery = true, value = "select * FROM formation c WHERE c.domaine_id = ?1")
    List<Formation> findByDomaine(Long domaine);
 */
    @Query(value = "SELECT * FROM formation f WHERE f.annee_scolaire_id = ?1", nativeQuery = true)
    List<Formation> findByAnneeScolaire(Long anneeScolaireId);

    @Query(value = "SELECT * FROM formation f WHERE f.ufr_id = ?1", nativeQuery = true)
    List<Formation> findByUfrFormation(Long ufrId);

}
