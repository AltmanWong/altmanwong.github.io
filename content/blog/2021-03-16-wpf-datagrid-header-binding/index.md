---
title: WPF DataGrid Header Binding
date: "2021-03-16T13:28:03.284Z"
description:
hashtag: C#,技術隨筆
cover:  cover.jpg
---

```xml
<DataGridTemplateColumn>
  <DataGridTemplateColumn.Header>
    <TextBlock Text="{Binding Path=Header}">
  </DataGridTemplateColumn.Header>
</DataGridTemplateColumn>
```
Bind 唔到

```xml
<DataGridTemplateColumn>
  <DataGridTemplateColumn.HeaderTemplate>
    <DataTemplate>
      <TextBlock Text="{Binding Path=Header}">
    </DataTemplate>
  </DataGridTemplateColumn.HeaderTemplate>
</DataGridTemplateColumn>
```
Bind 到

Reference: [https://stackoverflow.com/questions/19364701/wpf-datagrid-and-datagridtemplatecolumn-header-problems](https://stackoverflow.com/questions/19364701/wpf-datagrid-and-datagridtemplatecolumn-header-problems)