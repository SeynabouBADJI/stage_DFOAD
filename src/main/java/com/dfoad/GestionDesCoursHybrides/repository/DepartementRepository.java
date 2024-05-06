package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Departement;
@Repository
public interface DepartementRepository extends JpaRepository<Departement , Long>{
    @Query(value = "SELECT * FROM departement d WHERE d.ufr_id = ?1", nativeQuery = true)
    List<Departement> findByUfr(Long ufrId);

    @Query(value = "SELECT f.* FROM formation f JOIN departement u ON f.departement_id = u.id WHERE f.id = ?1", nativeQuery = true)
    List<Departement> findByFormationDepartement(Long formationId);


}

