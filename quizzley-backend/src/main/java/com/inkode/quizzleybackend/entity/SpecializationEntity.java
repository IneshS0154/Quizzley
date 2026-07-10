package com.inkode.quizzleybackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "specializations")
public class SpecializationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "specialization_id")
    private Integer id;

    @Column(name = "specialization_name", nullable = false, unique = true)
    private String specializationName;

    public SpecializationEntity() {}

    public SpecializationEntity(String specializationName) {
        this.specializationName = specializationName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSpecializationName() {
        return specializationName;
    }

    public void setSpecializationName(String specializationName) {
        this.specializationName = specializationName;
    }
}
