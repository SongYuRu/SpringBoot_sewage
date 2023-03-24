package com.example.springboot_sewage.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Progress {
    private Integer  id;
    private String villageName;
    private String startWork;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date plannedTime;
    private String cutPavement;
    private String brokenPavement;
    private String developPavement;
    private String buriedPipe;
    private String backfillTheEarth;
    private String pavementRestoration;
    private Integer mainInspectionWell;
    private Integer branchCheckWell;
    private String terminalConstruction;
}
