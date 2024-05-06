package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.ParcoursUe;

@Repository
public interface ParcoursUeRepository extends JpaRepository<ParcoursUe, Long> {
    @Query(value = "SELECT * FROM parcours_ue WHERE parcours_id = ?1", nativeQuery = true)
    List<ParcoursUe> findByParcours(Long idParcours);

    @Query(value = "SELECT * FROM parcours_ue WHERE ue_id = ?1", nativeQuery = true)
    List<ParcoursUe> findByParcoursUe(Long idUe);

}
