package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date dateStage;
    private Date dateCommencement;
    private Date signatureEnseignant;
    private Date signatureResponsable;
    private Integer duree;
    @ManyToOne
    private Enseignant enseignant;
    @ManyToOne
    private ResponsableDfoad responsableDfoad;
   
   
}
