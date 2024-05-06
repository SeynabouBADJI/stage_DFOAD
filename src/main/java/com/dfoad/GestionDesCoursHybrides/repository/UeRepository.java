package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.Ec;
import com.dfoad.GestionDesCoursHybrides.modele.ParcoursUe;
import com.dfoad.GestionDesCoursHybrides.modele.Ue;

@Repository
public interface UeRepository extends JpaRepository<Ue, Long> {

}
