package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Parcours;
import com.dfoad.GestionDesCoursHybrides.modele.ParcoursUe;
import com.dfoad.GestionDesCoursHybrides.modele.Semestre;
@Repository
public interface ParcoursRepository extends JpaRepository<Parcours , Long>{
 
    @Query(nativeQuery = true, value =  "select * FROM parcours WHERE semestre_id =:idsemestre ;")
    List<Parcours> findBySemestre(@Param("idsemestre") Long idsemestre);
}

