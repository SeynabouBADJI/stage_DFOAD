package com.dfoad.GestionDesCoursHybrides.modele;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParcoursUe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int coefficient;
    private int credit;
    // Indique la relation ManyToOne avec Parcours
    @ManyToOne
    private Parcours parcours;
    @ManyToOne
    private Ue ue;
    
}
