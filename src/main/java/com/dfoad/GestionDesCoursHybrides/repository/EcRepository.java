package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Cours;
import com.dfoad.GestionDesCoursHybrides.modele.Ec;

@Repository
public interface EcRepository extends JpaRepository<Ec, Long> {
    @Query(value = "SELECT * FROM ec e WHERE e.ue_id = ?1", nativeQuery = true)
    List<Ec> findByUe(Long ueId);

}
