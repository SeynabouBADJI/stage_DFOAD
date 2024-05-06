package com.dfoad.GestionDesCoursHybrides.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Cours;
import com.dfoad.GestionDesCoursHybrides.modele.Enseignant;

@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {
    @Query(value = "SELECT * FROM cours c WHERE c.ec_id = ?1", nativeQuery = true)
    List<Cours> findByEc(Long ecId);

}
