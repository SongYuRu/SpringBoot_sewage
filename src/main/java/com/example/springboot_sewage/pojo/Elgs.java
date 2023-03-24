package com.example.springboot_sewage.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Elgs {
    private  Integer id;
    private String pollutantOrProjectName;
    private String standard;
    private String criterion;
    private String norm;
    private String monitoringMosition;
}
