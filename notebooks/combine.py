import pandas as pd
def combine_csv(output_csv, main_csv, threshold=1000):
    main_df = pd.read_csv(main_csv)

    output_df = pd.read_csv(output_csv)

    if len(output_df) >= threshold:
        combined_df = pd.concat([main_df, output_df], ignore_index=True)
        combined_df.to_csv(main_csv, index=False)
        open(output_csv, 'w').close()



output_csv = r"C:\Users\Ayush\dark-patterns-recognition\train_classifier\output.csv"
main_csv = r"C:\Users\Ayush\dark-patterns-recognition\train_classifier\dark_patterns.csv"

combine_csv(output_csv, main_csv)
