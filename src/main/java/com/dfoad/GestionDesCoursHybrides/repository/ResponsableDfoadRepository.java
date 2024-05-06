package com.dfoad.GestionDesCoursHybrides.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dfoad.GestionDesCoursHybrides.modele.ResponsableDfoad;
import com.dfoad.GestionDesCoursHybrides.modele.Contrat;

@Repository
public interface ResponsableDfoadRepository extends JpaRepository<ResponsableDfoad, Long> {
    @Query(value = "SELECT * FROM responsable_dfoad r WHERE r.pseudo = ?1", nativeQuery = true)
    Optional<ResponsableDfoad> findByPseudo(String user);

}
